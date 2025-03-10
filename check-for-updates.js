#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import util from 'util';
import { exec } from 'child_process';

const execPromise = util.promisify(exec);

// Resolve `__dirname` equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json from current directory
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const devDependencies = packageJson.devDependencies || {};

// Function to get latest version from npm registry
function getLatestVersion(packageName) {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/${packageName}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const packageInfo = JSON.parse(data);
          resolve({
            name: packageName,
            current: devDependencies[packageName].replace(/^\^|~/, ''),
            latest: packageInfo['dist-tags'].latest
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function checkVersions() {
  console.log('Checking for latest versions of devDependencies...\n');
  
  const packages = Object.keys(devDependencies);
  const results = [];
  let updateNeeded = false;
  
  // Create promises for all package checks
  const promises = packages.map(pkg => getLatestVersion(pkg));
  
  try {
    // Execute all promises in parallel
    const packageVersions = await Promise.all(promises);
    
    // Sort packages alphabetically
    packageVersions.sort((a, b) => a.name.localeCompare(b.name));
    
    // Print results in table format
    console.log('Package'.padEnd(40) + 'Current'.padEnd(15) + 'Latest'.padEnd(15) + 'Status');
    console.log('─'.repeat(80));
    
    for (const pkg of packageVersions) {
      const isOutdated = pkg.current !== pkg.latest;
      const status = isOutdated ? '🔄 Update available' : '✅ Up to date';
      
      if (isOutdated) updateNeeded = true;
      
      console.log(
        pkg.name.padEnd(40) + 
        pkg.current.padEnd(15) + 
        pkg.latest.padEnd(15) + 
        status
      );
      
      results.push({
        name: pkg.name,
        current: pkg.current,
        latest: pkg.latest,
        outdated: isOutdated
      });
    }
    
    // Generate update command if needed
    if (updateNeeded) {
      const outdatedPackages = results
        .filter(pkg => pkg.outdated)
        .map(pkg => `${pkg.name}@latest`);
      
      console.log('\n');
      console.log('To update all outdated packages, run:');
      console.log(`npm install --save-dev ${outdatedPackages.join(' ')}`);
    } else {
      console.log('\nAll devDependencies are up to date! 🎉');
    }
    
  } catch (error) {
    console.error('Error checking package versions:', error);
  }
}

checkVersions();

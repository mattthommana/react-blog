import axios from 'axios';

interface MarkdownMetadata {
  [key: string]: string | string[] | boolean | number;
}

/**
 * Parse frontmatter metadata from markdown content
 */
export function parseFrontmatter(content: string): { 
  metadata: MarkdownMetadata; 
  content: string;
} {
  const metadataRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = metadataRegex.exec(content);
  
  if (!match) {
    return { 
      metadata: {}, 
      content 
    };
  }
  
  const metadataStr = match[1];
  const contentWithoutMetadata = content.slice(match[0].length);
  const metadata: MarkdownMetadata = {};
  
  // Parse each line of the frontmatter
  metadataStr.split('\n').forEach(line => {
    const colonPosition = line.indexOf(':');
    if (colonPosition !== -1) {
      const key = line.slice(0, colonPosition).trim();
      let value: string | boolean | string[] = line.slice(colonPosition + 1).trim();
      
      // Remove quotes if they exist
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Convert "true" and "false" strings to boolean
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      // Convert arrays (e.g. ["tag1", "tag2"])
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // If parsing fails, keep as string
        }
      }
      
      metadata[key] = value;
    }
  });
  
  return {
    metadata,
    content: contentWithoutMetadata
  };
}

/**
 * Load markdown content from a file
 */
export async function loadMarkdownFile(path: string): Promise<{ 
  metadata: MarkdownMetadata; 
  content: string;
}> {
  try {
    const response = await axios.get(path);
    return parseFrontmatter(response.data);
  } catch (error) {
    console.error(`Error loading markdown file from ${path}:`, error);
    throw error;
  }
}
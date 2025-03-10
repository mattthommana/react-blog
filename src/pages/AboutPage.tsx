import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuthorProfile from '../components/AuthorProfile';

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About | Matter St. Blog</title>
        <meta name="description" content="About the author of Matter St. Blog" />
      </Helmet>

      <div className="space-y-12">
        <h1 className="text-3xl font-semibold text-center">About The Author</h1>
        
        <AuthorProfile
          name="Matthew Thommana"
          imageSrc="/matthew.webp"
          description="Engineer at Anduril. I'm a software engineer focused on creating highly impactful performance software. I mostly blog about software performance, technical leadership, and fun engineering."
          descriptionPosition="right"
        />

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          
          <div className="flex flex-col space-y-8">
            <div className="animate border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="text-sm opacity-75">Oct 2024 - Present</div>
              <div className="font-semibold text-black dark:text-white">Anduril</div>
              <div className="text-sm opacity-75">Staff Software Engineer</div>
              <div className="text-sm opacity-75">Washington, DC</div>
              <ul className="ml-4 list-disc space-y-1 pt-2">
                <li>Contributing to the development of <strong>next-generation defense capabilities</strong> through advanced software engineering and systems integration</li>
              </ul>
            </div>
            
            <div className="animate border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="text-sm opacity-75">Feb 2020 - Oct 2024</div>
              <div className="font-semibold text-black dark:text-white">
                The Johns Hopkins University Applied Physics Laboratory
              </div>
              <div className="text-sm opacity-75">Senior AI Systems Engineer, Principal Investigator</div>
              <div className="text-sm opacity-75">Laurel, MD</div>
              <ul className="ml-4 list-disc space-y-1 pt-2">
                <li>Led Electronic Warfare portfolio for Intelligent Combat Platforms, <strong>scaling portfolio value from $0 to over $2 million</strong> through strategic program development</li>
                <li><strong>Technical Lead</strong> on major DoD autonomy initiatives including <strong>AFRL Golden Horde and DARPA ACE/AIRS</strong>, orchestrating collaboration across <strong>15+ defense companies</strong> to successfully transition cutting-edge technology into operational systems</li>
                <li>Drove business growth by securing <strong>$6 million in funding</strong> for AI and Autonomy platform transitions</li>
                <li>Achieved exceptional ROI as Principal Investigator on <strong>8 internal R&D projects</strong>, with 6 securing external funding resulting in <strong>15x return on investment</strong> in under 4 years</li>
                <li>Led Software Quality Working Group, establishing comprehensive standards and review processes for a <strong>2000+ engineer organization</strong></li>
              </ul>
            </div>
            
            <div className="animate border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="text-sm opacity-75">Jun 2018 - Feb 2020</div>
              <div className="font-semibold text-black dark:text-white">
                Georgia Tech Research Institute
              </div>
              <div className="text-sm opacity-75">Researcher</div>
              <div className="text-sm opacity-75">Atlanta, GA</div>
              <ul className="ml-4 list-disc space-y-1 pt-2">
                <li>Engineered comprehensive <strong>automated testing suite</strong> for radio and jammer performance characterization</li>
                <li>Characterized performance on many radio systems (Derived from MIL-STDs, ETSI, TIA)</li>
                <li>Developed <strong>advanced data analytics pipelines</strong> for processing and visualizing complex, high-dimensional datasets</li>
              </ul>
            </div>
            
            <div className="animate border-b border-gray-300 dark:border-gray-700 pb-4">
              <div className="text-sm opacity-75">Jun 2014 - Jun 2018</div>
              <div className="font-semibold text-black dark:text-white">
                Collins Aerospace
              </div>
              <div className="text-sm opacity-75">Engineer</div>
              <div className="text-sm opacity-75">Cedar Rapids, Iowa</div>
              <ul className="ml-4 list-disc space-y-1 pt-2">
                <li>Pioneered implementation of features in the <strong>first multicore processor</strong> to achieve <strong>DAL-A level DO-178C certification</strong></li>
                <li>Enhanced <strong>VxWorks and LynxOs</strong> operating systems with safety-critical feature implementations</li>
                <li>Implemented <strong>multi-threading capabilities</strong> and deployed additional Real Time Operating Systems on NXP T2080 platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
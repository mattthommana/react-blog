import { useEffect } from 'react';

interface HeadProps {
  title: string;
  description?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Simple component to manage document head metadata
 */
const Head = ({ title, description, ogImage, canonicalUrl }: HeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description || '');
    
    // Update Open Graph tags if provided
    if (ogImage) {
      let ogImageTag = document.querySelector('meta[property="og:image"]');
      if (!ogImageTag) {
        ogImageTag = document.createElement('meta');
        ogImageTag.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageTag);
      }
      ogImageTag.setAttribute('content', ogImage);
    }
    
    // Set canonical URL if provided
    if (canonicalUrl) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);
    }
    
    // Cleanup function
    return () => {
      // We don't actually remove the tags to avoid flickering,
      // but you could add removal logic here if needed
    };
  }, [title, description, ogImage, canonicalUrl]);

  // This component doesn't render anything
  return null;
};

export default Head;
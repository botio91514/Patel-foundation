import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MEDIA } from '@/data/media';

interface SEOProps {
    title: string;
    description: string;
}

const SEO = ({ title, description, image = MEDIA.brand.logoFull, url = window.location.href }: { title: string, description: string, image?: string, url?: string }) => {
    const location = useLocation();

    useEffect(() => {
        // 1. Title
        document.title = `${title} | Patel Foundation`;

        // 2. Helper to update/create meta tags
        const updateMeta = (name: string, content: string, attribute = 'name') => {
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Standard
        updateMeta('description', description);
        updateMeta('viewport', 'width=device-width, initial-scale=1');

        // Open Graph / Facebook
        updateMeta('og:type', 'website', 'property');
        updateMeta('og:url', url, 'property');
        updateMeta('og:title', title, 'property');
        updateMeta('og:description', description, 'property');
        updateMeta('og:image', image, 'property');

        // Twitter
        updateMeta('twitter:card', 'summary_large_image');
        updateMeta('twitter:url', url);
        updateMeta('twitter:title', title);
        updateMeta('twitter:description', description);
        updateMeta('twitter:image', image);

    }, [title, description, image, url, location]);

    return null;
};

export default SEO;

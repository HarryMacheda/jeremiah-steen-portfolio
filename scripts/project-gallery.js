(() => {
    const config = window.projectGalleryConfig || window.projectGalleryData;
    if (!config || !Array.isArray(config.rows)) {
        return;
    }

    const galleryRoot = document.getElementById('project-gallery');
    if (!galleryRoot) {
        return;
    }

    const isVideoItem = (item) => {
        if (!item || typeof item.src !== 'string') {
            return false;
        }

        const typeHint = String(item.type || '').toLowerCase();
        return typeHint === 'video'
    };


    const sanitizeItem = (item) => {
        if (typeof item === 'string') {
            return { src: item };
        }
        return item && typeof item === 'object' ? item : {};
    };

    const createOverlay = (description, altText) => {
        const overlay = document.createElement('div');
        overlay.className = 'project-gallery-overlay';
        overlay.textContent = description || altText || 'Preview';
        return overlay;
    };

    const createImageElement = (item) => {
        const image = document.createElement('img');
        image.src = config.basePath + item.src;
        image.alt = item.alt || item.description || '';
        image.loading = 'lazy';
        return image;
    };

    const createVideoElement = (item) => {
        const video = document.createElement('video');
        video.controls = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.autoplay = true;
        if (item.poster) {
            video.poster = config.basePath + item.poster;
        }
        const source = document.createElement('source');
        source.src = config.basePath + item.src;
        source.type = 'video/quicktime';
        video.appendChild(source);
        return video;
    };

    const createMedia = (item) => {
        if (isVideoItem(item)) {
            return createVideoElement(item);
        }
        return createImageElement(item);
    };

    const renderGallery = () => {
        galleryRoot.innerHTML = '';
        galleryRoot.classList.add('project-gallery');

        config.rows.forEach((row) => {
            if (!Array.isArray(row) || row.length === 0) {
                return;
            }

            const rowElement = document.createElement('div');
            rowElement.className = 'project-gallery-row';
            rowElement.style.gridTemplateColumns = `repeat(${Math.max(1, row.length)}, minmax(0, 1fr))`;

            row.forEach((rawItem) => {
                const item = sanitizeItem(rawItem);
                if (!item.src) {
                    return;
                }

                const card = document.createElement('div');
                card.className = 'project-gallery-item';
                card.tabIndex = 0;

                const media = createMedia(item);

                if(item.description !== "")
                {
                    media.style.cursor = 'pointer';
                    const overlay = createOverlay(item.description, item.alt);
                    card.appendChild(overlay);
                }
                 card.appendChild(media);
                rowElement.appendChild(card);
            });

            galleryRoot.appendChild(rowElement);
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderGallery);
    } else {
        renderGallery();
    }
})();

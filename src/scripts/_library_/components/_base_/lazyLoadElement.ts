import CommonElement from './commonElement';

export default class LazyLoadElement extends CommonElement {
    protected _setupImageLazy(image: HTMLImageElement): void {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const urldataset = image.dataset.src;
                        if (urldataset !== undefined) {
                            const imageHelper = new Image();
                            imageHelper.src = urldataset;
                            imageHelper.onload = () => {
                                image.src = urldataset;
                                image.classList.remove("lazy");
                                imageObserver.unobserve(image);
                            }
                        }
                    }
                });
            });
            imageObserver.observe(image);
        } else {
            const _lazyLoad = () => {
                if (!image.classList.contains('lazy')) return;

                const scrollTop = window.pageYOffset;
                const viewportOffset = image.getBoundingClientRect();
                const imageTop = viewportOffset.top;

                if (imageTop < (window.innerHeight + scrollTop)) {
                    const urldataset = image.dataset.src;
                    if (urldataset !== undefined) {
                        const imageHelper = new Image();
                        imageHelper.src = urldataset;
                        imageHelper.onload = () => {
                            image.src = urldataset;
                            image.classList.remove("lazy");
                        }
                    }
                }
            }
            document.addEventListener('scroll', _lazyLoad, false);
            window.addEventListener('resize', _lazyLoad, false);
            window.addEventListener('orientationChange', _lazyLoad, false);
        }
    }
}
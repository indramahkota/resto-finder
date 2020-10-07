import CommonElement from './commonElement';

export default class LazyLoadElement extends CommonElement {
    protected _setupImageLazy(image: HTMLImageElement): void {
        const urldataset = image.dataset.src;

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
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
            if (urldataset !== undefined) {
                image.src = urldataset;
                image.onload = () => {
                    image.classList.remove("lazy");
                }
            }
        }
    }
}
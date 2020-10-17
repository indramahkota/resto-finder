export default interface IScrollEffect {
    _ticking: boolean;
    _currentScrollPosition: number;
    _lastScrollPosition: number;
    _onScrollHandler: () => void;
}
import RestoFinderApp from '../src/scripts/views/RstfApp';
import PageDetails from '../src/scripts/views/pageDetails';
import PageFavorites from '../src/scripts/views/pageFavorites';
import PageHome from '../src/scripts/views/pageHome';
import AppBar from '../src/scripts/_library_/components/app-bar/appBar';
import AppToast from '../src/scripts/_library_/components/app-toast/appToast';
import DetailsCard from '../src/scripts/_library_/components/details-card/detailsCard';
import DetailsCardShimmer from '../src/scripts/_library_/components/detailscard-shimmer/detailsCardShimmer';
import FavoriteButton from '../src/scripts/_library_/components/favorite-button/favoriteButton';
import FootBar from '../src/scripts/_library_/components/foot-bar/footBar';
import GoTop from '../src/scripts/_library_/components/go-top/goTop';
import HeroElement from '../src/scripts/_library_/components/hero-element/heroElement';
import ratingElement from '../src/scripts/_library_/components/rating-element/ratingElement';
import RestoCard from '../src/scripts/_library_/components/resto-card/restoCard';
import RestoCardShimmer from '../src/scripts/_library_/components/restocard-shimmer/restoCardShimmer';
import ReviewCard from '../src/scripts/_library_/components/review-card/reviewCard';
import ReviewForm from '../src/scripts/_library_/components/review-form/reviewForm';
import SearchBar from '../src/scripts/_library_/components/search-bar/searchBar';
import SocialMedia from '../src/scripts/_library_/components/sosial-media/socialMedia';
import UserProfile from '../src/scripts/_library_/components/user-profile/userProfile';
import RestoContainer from '../src/scripts/_library_/containers/resto-container/restoContainer';
import ReviewContainer from '../src/scripts/_library_/containers/review-container/reviewContainer';
import TestUtils from './CustomelementTestUtilities';

describe('Custom Element Instance Of their class', () => {
    it('should Instance Of RestoFinderApp', () => {
        const el = document.createElement('rstf-app');
        expect(el).toBeInstanceOf(RestoFinderApp);
    });

    it('should Instance Of PageDetails', () => {
        const el = document.createElement('rstf-details');
        expect(el).toBeInstanceOf(PageDetails);
    });

    it('should Instance Of PageFavorites', () => {
        const el = document.createElement('rstf-favorites');
        expect(el).toBeInstanceOf(PageFavorites);
    });

    it('should Instance Of PageHome', () => {
        const el = document.createElement('rstf-home');
        expect(el).toBeInstanceOf(PageHome);
    });

    it('should Instance Of AppBar', () => {
        const el = document.createElement('app-bar');
        expect(el).toBeInstanceOf(AppBar);
    });

    it('should Instance Of AppToast', () => {
        const el = document.createElement('app-toast');
        expect(el).toBeInstanceOf(AppToast);
    });

    it('should render AppToast correctly', async () => {
        const _root = await TestUtils.render('app-toast', {
            message: "Text Message"
        });
        expect(_root.innerHTML.includes("Text Message")).toBeTruthy();
    });

    it('should Instance Of DetailsCard', () => {
        const el = document.createElement('details-card');
        expect(el).toBeInstanceOf(DetailsCard);
    });

    it('should Instance Of DetailsCardShimmer', () => {
        const el = document.createElement('detailscard-shimmer');
        expect(el).toBeInstanceOf(DetailsCardShimmer);
    });

    it('should Instance Of FavoriteButton', () => {
        const el = document.createElement('favorite-button');
        expect(el).toBeInstanceOf(FavoriteButton);
    });

    it('should Instance Of FootBar', () => {
        const el = document.createElement('foot-bar');
        expect(el).toBeInstanceOf(FootBar);
    });

    it('should Instance Of GoTop', () => {
        const el = document.createElement('go-top');
        expect(el).toBeInstanceOf(GoTop);
    });

    it('should Instance Of HeroElement', () => {
        const el = document.createElement('hero-element');
        expect(el).toBeInstanceOf(HeroElement);
    });

    it('should Instance Of ratingElement', () => {
        const el = document.createElement('rating-element');
        expect(el).toBeInstanceOf(ratingElement);
    });

    it('should Instance Of RestoCard', () => {
        const el = document.createElement('resto-card');
        expect(el).toBeInstanceOf(RestoCard);
    });

    it('should Instance Of RestoCardShimmer', () => {
        const el = document.createElement('restocard-shimmer');
        expect(el).toBeInstanceOf(RestoCardShimmer);
    });

    it('should Instance Of ReviewCard', () => {
        const el = document.createElement('review-card');
        expect(el).toBeInstanceOf(ReviewCard);
    });

    it('should Instance Of ReviewForm', () => {
        const el = document.createElement('review-form');
        expect(el).toBeInstanceOf(ReviewForm);
    });

    it('should Instance Of SearchBar', () => {
        const el = document.createElement('search-bar');
        expect(el).toBeInstanceOf(SearchBar);
    });

    it('should Instance Of SocialMedia', () => {
        const el = document.createElement('social-media');
        expect(el).toBeInstanceOf(SocialMedia);
    });

    it('should Instance Of UserProfile', () => {
        const el = document.createElement('user-profile');
        expect(el).toBeInstanceOf(UserProfile);
    });

    it('should Instance Of RestoContainer', () => {
        const el = document.createElement('resto-container');
        expect(el).toBeInstanceOf(RestoContainer);
    });

    it('should Instance Of ReviewContainer', () => {
        const el = document.createElement('review-container');
        expect(el).toBeInstanceOf(ReviewContainer);
    });
});
import { HomeAdvantages } from './HomeAdvantages';
import { HomeFaq } from './HomeFaq';
import { HomeHero } from './HomeHero';
import { HomeQuestion } from './HomeQuestion';
import { HomeSocial } from './HomeSocial';
import { HomeSpeed } from './HomeSpeed';
import { HomeTarif } from './HomeTarifs';
import { HomeUsage } from './HomeUsage';
import { HomeVideo } from './HomeVideo';

export default function HomePage() {
	return (
		<>
			<HomeHero />
			<HomeAdvantages />
			<HomeSpeed />
			<HomeTarif />
			{/* <HomeVideo /> */}
			<HomeUsage />
			<HomeSocial />
			<HomeFaq />
			<HomeQuestion />
		</>
	);
}

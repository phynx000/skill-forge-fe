import BannerHomePage from "../components/Banner/Banner";
import FeaturedCourseList from "../components/FeaturedCourse/FeatureCourseList";
import Categories from "../components/Categories/Categories";
import Testimonials from "../components/Testimonials/Testimonials";
import CallToAction from "../components/CallToAction/CallToAction";

export function HomePage() {
  return (
    <>
      <BannerHomePage />
      <Categories />
      <FeaturedCourseList />
      <Testimonials />
      <CallToAction />
    </>
  );
}

import BannerHomePage from "../components/Banner/Banner";
import { Breadcrumb } from 'antd';
import FeaturedCourseList from "../components/FeaturedCourse/FeatureCourseList";

export function HomePage() {


  return (
    <>
      <Breadcrumb
        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        style={{ margin: '16px 0' }}
      />
      <BannerHomePage />
      <FeaturedCourseList />
    </>
  );
}

import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";
import { IoWarningOutline } from "react-icons/io5";

const Layout = ({ children }: any) => {
  const location = useLocation();

  const isAdminRoute = location.pathname.includes("administration");
  if (isAdminRoute) {
    return (
      <>
        <Header isLogin={true} />
        <main className="bg-[#454243] hidden xl:flex pt-20 relative">
          <SideBar />
          <div className="ml-52">{children}</div>
        </main>
        <section className="bg-[#454243] flex flex-col justify-center items-center xl:hidden pt-28 h-screen text-white gap-4 pl-20">
          <IoWarningOutline className="text-6xl" />
          <p className="text-2xl font-semibold">
            Not available in mobile version
          </p>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

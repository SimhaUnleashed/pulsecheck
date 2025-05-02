import NavBar from "../../components/ui/NavBar";
const Layout = async ({ children }) => {
  return (
    <div className="p-10">
      <NavBar type={"root"}/>
      {children}
    </div>
  );
};

export default Layout;
import { redirect } from "next/navigation";
import NavBar from "../../../components/ui/NavBar";
import { getCurrentUser } from "../../../lib/actions/auth.action";
import { toast } from "sonner";
const Layout = async ({ children,params }) => {
  
  return (
    <div className="p-10">
      <NavBar type={"dashboard"}/>
      {children}
    </div>
  );
};

export default Layout;
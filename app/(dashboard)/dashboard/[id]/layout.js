import { redirect } from "next/navigation";
import NavBar from "../../../../components/ui/NavBar";
import { getCurrentUser } from "../../../../lib/actions/auth.action";
import { checkUserInTeam } from "../../../../lib/actions/teams.action";
import { toast } from "sonner";
const Layout = async ({ children,params }) => {
  const {id} = params;
  console.log(id);
  const user = await getCurrentUser();
  const userEmail = user?.email;

  const isUserInTeam = await checkUserInTeam({ teamId:id, userEmail });

  if (!isUserInTeam.success) {
    redirect("/");
  }
  return (
    <div className="p-10">
      <NavBar type={"dashboard"}/>
      {children}
    </div>
  );
};

export default Layout;
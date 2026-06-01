import { useSelector } from "react-redux";
import Dashboard from "./DashboardPage";
import DashboardInvestor from "./DashboardInvestor";

const DashboardRouter = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "investor") {
    return <DashboardInvestor />;
  }

  return <Dashboard />;
};

export default DashboardRouter;
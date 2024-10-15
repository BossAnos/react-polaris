import { Grid, Page } from "@shopify/polaris";
import BarChart from "../../components/chart/barChart";
import LineChart from "../../components/chart/lineChart";
import DateRange from "../../components/datePicker/datePicker";
import useTitle from "../../hook/useTitle";

function Dashboard() {
  useTitle("Dashboard");
  return (
    <>
      <Page title="Dashboard" fullWidth>
        <DateRange />
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <LineChart />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
            <BarChart />
          </Grid.Cell>
        </Grid>
      </Page>
    </>
  );
}

export default Dashboard;

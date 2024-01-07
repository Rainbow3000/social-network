import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";
import {getPostStat,getUserStat} from '../../store/slice/statSlice'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from "react";
const SalesChart = () => {

  const dispatch = useDispatch(); 
  const {userStat,postStat}  = useSelector(state => state.stat)

  useEffect(()=>{
    dispatch(getPostStat()); 
    dispatch(getUserStat()); 
  },[])

  const chartoptions = {
    series: [
      {
        name: "Người dùng",
        data: [...userStat],
      },
      {
        name: "Bài viết",
        data: [...postStat]
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Thông kê số tài khoản và số bài viết mỗi tháng</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Clockstatus from "../img/clock-status.gif";
import Repairstatus from "../img/repair-status.gif";
import Submitstatus from "../img/submit-status.gif";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import th from "dayjs/locale/th";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
dayjs.extend(buddhistEra);


const DateLongTH = (date) => {
  dayjs.locale(th); // ตั้งค่าภาษาเป็นภาษาไทย
  return dayjs(date).format("DD MMMM BBBB");
};

function homeuser() {
  //ตัวแปรดึงข้อมูลเบอรโทร,ชื่อลูกค้า
  const [phone, setPhone] = useState("");
  const [plate, setPlate] = useState("");
  //ตัวแปรทีไว้แสดงค่า
  const [orderData, setOrderData] = useState([]);
  const [orderUpdate, setOrderUpdate] = useState([]);
  const [error, setError] = useState(null);

  //ตัวแปรฟังก์ชั่น
  const searchOrders = async () => {
    try {
      //ตัวแปรรอค่าจากหลังบ้าน
      const response = await axios.get(
        `http://localhost:3005/customerData/${phone}/${plate}`
      );
      const data = response.data;
      console.log(data);
      setOrderData(data.data);
      setOrderUpdate(data.data[0]);
      setError(null);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการร้องข้อมูล:", error);
      setError("เกิดข้อผิดพลาดในการค้นหาข้อมูล");
    }
  };

  const calculateTotalCost = () => {
    let totalCost = 0;

    orderData.forEach(data => {
      totalCost += parseFloat(data.estimate_price);
    });
    
    return totalCost;
  };

  useEffect(() => {
    console.log(orderUpdate);
    console.log(orderData[0]?.status_update === null );
    // console.log([orderUpdate].map((data) => console.log(data.name)));
    // console.log(orderData.map((data) => console.log(data)));
    console.log(Array.isArray(orderUpdate));
  }, [orderUpdate]);
  return (
    <div>
      <Navbar />
      <div className="App">
        <div className="search">
          <input
            type="search"
            className="mysearch"
            placeholder="กรอกป้ายทะเบียน"
            onChange={(e) => setPlate(e.target.value)}
          />
        </div>
        <div className="search">
          <input
            type="search"
            className="telsearch"
            placeholder="กรอกเบอร์โทรศัพท์"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="btcontent">
          <button className="bt" onClick={searchOrders}>
            ค้นหา
          </button>
        </div>
      </div>
      <div>
        {error && <span>{error}</span>}
        {orderUpdate.length !== 0 ? (
          <div className="bg-data">
            <div>
              <h2 className="head-tb">รายการซ่อมที่เกี่ยวข้อง</h2>

              {[orderUpdate].map((order) => (
                <div key={1}>
                  <div className="conbtw">
                    <div className="data-cust">
                      <b>ชื่อลูกค้า: </b>
                      <font color="#213555">{order.name}</font> <br></br>
                      <b>เบอร์โทร: </b>
                      <font color="#213555">{order.phone}</font> <br></br>
                      <b>ทะเบียนรถ: </b>
                      <font color="#213555">{order.plate_license}</font><br></br>
                      <b>รายละเอียด </b>
                      <font color="#213555">{order.description}</font>
                    </div>
                    <div className="data-cust">
                      <b>วันที่คาดว่าจะเสร็จ: </b>
                      <font color="#213555">
                        {DateLongTH(order.estimate_time)}
                      </font>
                    </div>
                  </div>

                  <div className="con-car">
                    <div className="data-cust">
                      <b>สถานะ: </b>
                      <font color="#213555">{order.status_name}</font>
                    </div>
                    <div className="data-cust">
                      <b>ช่าง: </b>
                      <font color="#213555">{order.mech_name}</font>
                    </div>
                  </div>
                  <div className="center-status">
                    {order.status_name === "รับรถเข้าอู่" && (
                      <img
                        className="icon-status"
                        src={Clockstatus}
                        alt=""
                      ></img>
                    )}
                    {order.status_name === "กำลังดำเนินการซ่อม" && (
                      <img
                        className="icon-status"
                        src={Repairstatus}
                        alt=""
                      ></img>
                    )}
                    {order.status_name === "ดำเนินการซ่อมเสร็จสิ้น" && (
                      <img
                        className="icon-status"
                        src={Submitstatus}
                        alt=""
                      ></img>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {orderData[0]?.order_detail_id === null ? (
              <div>
                
                <p className="head-tb" >ไม่มีข้อมูลการซ่อม</p>
              </div>
            ) : (
              
              <div>
                <h2 className="head-tb">อัพเดตการซ่อม</h2>
                <div className="con-center">
                  <Table>
                    <TableHead>
                      <TableRow >
                        <TableCell align="center">รายละเอียด</TableCell>
                        <TableCell align="center">สถานะ</TableCell>
                        <TableCell align="center">วันที่</TableCell>
                        <TableCell align="center">ค่าใช้จ่ายโดยประมาณ</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {orderData.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell align="center">{data.repair_description}</TableCell>
                          <TableCell align="center">{data.status_update}</TableCell>
                          <TableCell align="center">{DateLongTH(data.update_date)}</TableCell>
                          <TableCell align="center">{data.estimate_price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                </div><p className="con-center">สรุปราคาโดยประมาณ : {calculateTotalCost()}</p>
              </div>
              
            )}
          </div>
        ):(
          <div>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default homeuser;

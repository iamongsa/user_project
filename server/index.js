const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "new_ad_project",
});

app.listen(3005, () => {
  console.log("Hey , your server is running on port 3005!");
});

// app.get("/datastatus", (req, res) => {
//   const repair = req.params.
// });

app.get("/customerData/:phone/:plate", (req, res) => {
  const phone = req.params.phone;
  const plate = req.params.plate;

  const phoneSql = "SELECT cus_id FROM customers WHERE phone = ?";
  const plateSql = "SELECT car_id FROM cars WHERE plate_license = ?";

  db.query(phoneSql, [phone], (phoneErr, phoneResult) => {
    if (phoneErr) {
      console.log(phoneErr);
      res
        .status(500)
        .json({ error: "เกิดข้อผิดพลาดในการค้นหาหมายเลขโทรศัพท์" });
    } else if (phoneResult.length > 0) {
      const customer_id = phoneResult[0].cus_id;

      
      db.query(plateSql, [plate], (plateErr, plateResult) => {
        if (plateErr) {
          console.log(plateErr);
          res
            .status(500)
            .json({ error: "เกิดข้อผิดพลาดในการค้นหาหมายเลขทะเบียนรถ" });
        } else if (plateResult.length > 0) {
          const car_id = plateResult[0].car_id;
console.log(car_id);
          // db.query(
          //   `SELECT order_repair.order_id, order_repair.description, order_repair.estimate_time, customers.name, customers.phone, cars.plate_license, mechanic.mech_name, status_order.status_name, MAX(order_repair.create_order) AS last_create_order
          //   FROM order_repair
          //   INNER JOIN customers ON order_repair.customer_id = customers.cus_id
          //   INNER JOIN cars ON order_repair.car_id = cars.car_id
          //   INNER JOIN mechanic ON order_repair.mechanic_id = mechanic.mech_id
          //   INNER JOIN status_order ON order_repair.status_id = status_order.status_id
          //   WHERE order_repair.customer_id = ? AND order_repair.car_id = ?
          //   GROUP BY order_repair.order_id, order_repair.description, order_repair.estimate_time, customers.name, customers.phone, cars.plate_license, mechanic.mech_name, status_order.status_name
          //   ORDER BY last_create_order DESC
          //   LIMIT 1;
          //   `,
          //   [customer_id, car_id],
          //   (err, result) => {
          //     if (err) {
          //       console.log(err);
          //       res
          //         .status(500)
          //         .json({ error: "เกิดข้อผิดพลาดในการค้นหาข้อมูลรายการซ่อม" });
          //     } else {
          //       res.json(result);
          //     }
          //   }
          // );

          db.query(
            `SELECT * FROM order_repair 

            
            INNER JOIN customers ON order_repair.customer_id = customers.cus_id
            INNER JOIN cars ON order_repair.car_id = cars.car_id 
            
            WHERE order_repair.customer_id = ? AND order_repair.car_id = ? 
            ORDER BY create_order DESC
            LIMIT 1;
            `,
            [customer_id, car_id],
            (error, result) => {
              console.log(result);
              db.query(
                `SELECT * FROM order_repair 

                LEFT JOIN status_order ON order_repair.status_id = status_order.status_id
                LEFT JOIN order_detail ON order_repair.order_id = order_detail.order_id
                LEFT JOIN customers ON order_repair.customer_id = customers.cus_id
                LEFT JOIN cars ON order_repair.car_id = cars.car_id 
                LEFT JOIN mechanic ON order_repair.mechanic_id = mechanic.mech_id

                WHERE order_repair.order_id = ? 
                `,
                [result[0].order_id],
                (err, result) => {
                  console.log(result);
                  res.send({ data: result });
                }
              );
            }
          );
        } else {
          res.status(404).json({ error: "ไม่พบข้อมูลรถที่ระบุ" });
        }
      });
    } else {
      res.status(404).json({ error: "ไม่พบข้อมูลลูกค้าที่ระบุ" });
    }
  });
});

app.get("/getOrderId", (req, res) => {
  db.query("SELECT * FROM order_detail", (error, result) => {
    console.log(result);
  });
});

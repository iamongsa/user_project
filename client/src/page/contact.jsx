import React from "react";
import Navbarcontact from "../components/Navbarcontact";
import Imgcon from "../img/contact_img.png";
import "../page/contact.css"
function contact() {
  return (
    <div>
      <Navbarcontact />
      <div className="page-con">
        <div>
          <h2 className="text-head">ติดต่อได้ที่ </h2>
          <div className="text-ad">
            <p>
              บ้านเลขที่ 3 ซอยประชาอุทิศ 93 แขวงทุ่งครุ เขตทุ่งครุ กรุงเทพมหานคร
            </p>
            <p> เวลาทำการ จันทร์ - เสาร์ 09.00 - 17.00 </p>
            <p> เบอร์ติดต่อ 087 046 3471 (ช่างดำ) </p>
          </div>
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.5027653228426!2d100.503566875088!3d13.627152786751859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a3b8b298dae3%3A0xd1ce47e5235f62f1!2z4Lit4Li54LmI4LiK4LmI4Liy4LiH4LiU4Liz!5e0!3m2!1sth!2sth!4v1697924372949!5m2!1sth!2sth"
          ></iframe>
          <img src={Imgcon} alt="img-con" className="img-con"></img>
        </div>
        <div>         
        </div>
      </div>
    </div>
  );
}

export default contact;
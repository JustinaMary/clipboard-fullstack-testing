// Footer Component
import React from "react";
export default function Footer({ fixed }) {
  return (

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-5 bg-white p-5">
        <div className="col-span-1 lg:col-span-2">
            <span className="font-bold">About us</span>
            <p>
                We are a team of nurses, doctors, technologists and executives dedicated to help nurses find jobs that the love. <br />
                All copyrights reserved @ 2020 - health Explore
            </p>
        </div>
        <div className="col-span-1">
            <span className="font-bold">Sitemap</span>
            <ul>
                <li>Nurses</li>
                <li>Employers</li>
                <li>Social networking</li>
                <li>Jobs</li>
            </ul>
        </div>
        <div className="col-span-1">
            <span className="font-bold">Privacy</span>
            <ul>
                <li>Terms of use</li>
                <li>Privacy policy</li>
                <li>Cookie plicy</li>
            </ul>
        </div>
      </div>  
  );
}
// components/Card.js
import React from 'react';
import Link from "next/link";
import Image from 'next/image';
const Card = (props) => {
  return (
    <div className="card">
            <div className="serviceIcon">
            <Image
        src={props.imageUrl}
        alt={props.heading}
        width={500}
        height={300}
      />
            </div>
            <h5
              style={{ fontSize: "18px", color: "#F49F0A" }}
              className="heading"
            >
              <Link href={props.redirect} style={{ color: "#F49F0A" }}>
                {props.heading}
              </Link>
            </h5>
            <p>
              {props.text}
            </p>
          </div>
  )
};

export default Card;

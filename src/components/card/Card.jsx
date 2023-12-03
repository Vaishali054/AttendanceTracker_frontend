import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

export default function Card(props) {
  const { sem,branch } = props;

  let linkTo = `/branches/${branch}`;

  if (sem) {
    linkTo += `/${sem}`;
  }

  return (
    <Link to={linkTo} className='card-link'>
      {/* Link to the specific branch page */}
      <div className='card'>
        <div className='card-image'></div>
        <div className='card-title'>{sem ? sem :branch}</div>
      </div>
    </Link>
  );
}

Card.defaultProps={
  sem:false
}

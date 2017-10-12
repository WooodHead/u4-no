import React from 'react';
import buildUrl from '../helpers/buildUrl';
import { Link } from '../routes';

const Mosaic = ({ resources = [] }) => (
  <div className="c-mosaic">
    {resources.length ? (
      <div
        className="c-mosaic_item"
        style={{
          backgroundImage: `url(${resources[0].imageUrl})`,
        }}
      >
        >
      </div>
    ) : null}
    {resources.map(
      (
        { title = '', _id = '', _type = '', slug = '', imageUrl = '', titleColor = '#FFF' },
        index,
      ) => (
        <Link route={buildUrl({ _type, slug })}>
          <a
            className={`c-mosaic_item ${index % 4 === 2
              ? 'c-mosaic_item--backgroundImage'
              : ''} ${index % 4 === 2 && titleColor === '#000'
              ? 'c-mosaic_item--backgroundImage-invert'
              : ' '}`}
            style={{
              backgroundImage: `url(${index % 4 === 2 ? imageUrl : ''})`,
            }}
          >
            <div className="c-mosaic_item-content">
              <div
                className="c-mosaic_item-content__meta"
                style={{
                  color: index % 4 === 2 ? titleColor : ' ',
                }}
              >
                {_type}
              </div>
              <div>
                <h3
                  style={{
                    color: index % 4 === 2 ? titleColor : ' ',
                  }}
                >
                  {title}
                </h3>
              </div>
            </div>
          </a>
        </Link>
      ),
    )}
  </div>
);

export default Mosaic;
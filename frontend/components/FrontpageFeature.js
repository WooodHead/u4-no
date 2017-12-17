import React, { Component } from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'frontpage-feature',
  prefix: 'c-',
});

class FrontpageFeature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      image:
        'https://cdn.sanity.io/images/1f1lcoov/production/YCZv9hQlTcNdiI1zYXLrIglw-1642x1087.jpg',
    };
    this.triggerToggle = this.triggerToggle.bind(this);
    this.triggerImg = this.triggerImg.bind(this);
  }

  triggerToggle(e) {
    e.preventDefault();
    this.setState({
      active: !this.state.active,
    });
  }

  triggerImg(img) {
    this.setState({
      image:
        img ||
        'https://cdn.sanity.io/images/1f1lcoov/production/YCZv9hQlTcNdiI1zYXLrIglw-1642x1087.jpg',
    });
  }

  render() {
    const { topics } = this.props;
    return (
      <div {...classes(null, null, 'o-wrapper-full-width')}>
        <section {...classes('wrapper', null, 'o-wrapper-inner o-wrapper--padded')}>
          <div {...classes('left')}>
            <img src={`${this.state.image}?w=470&h=470&fit=crop&crop=focalpoint`} />
          </div>
          <div {...classes('right')}>
            <h3 {...classes('heading')}>Corruption by topic</h3>
            <ul {...classes('list')}>
              {topics.slice(0, 5).map(topic => (
                <li key={topic._id} {...classes('list-item')}>
                  <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                    <a {...classes('link')} onMouseEnter={() => this.triggerImg(topic.imageUrl)}>
                      {topic.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            {this.state.active ? (
              <ul {...classes('list', 'active')}>
                {topics.slice(5, 50).map(topic => (
                  <li {...classes('list-item')}>
                    <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                      <a {...classes('link')} onMouseEnter={() => this.triggerImg(topic.imageUrl)}>
                        {topic.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <a className="c-topic-section__cta-light" href="/topics">
              View all {topics.length} topics &nbsp;<ArrowRight />
            </a>
            {false && (
              <button {...classes('btn')} onClick={this.triggerToggle}>
                <ArrowRight {...classes('arrowdown', this.state.active ? 'active' : null)} />
                {this.state.active ? <span>View fewer topics</span> : <span>View all topics</span>}
              </button>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default FrontpageFeature;

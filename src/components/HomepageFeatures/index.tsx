import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '主打一个陪你学习',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        技术海洋深不见底，主打一个陪各位看客老爷们一起学习。
        开源的项目，开源的<code>MD</code> 文件,兼容各种阅读软件。
      </>
    ),
  },
  {
    title: '加入学习讨论群组',
    Svg: require('@site/static/img/weChat.svg').default,
    description: (
      <>
        前端学习群组，都说了主打陪伴~过期了麻烦社交平台踢我。
      </>
    ),
  },
  {
    title: '未成年人请勿打赏',
    Svg: require('@site/static/img/zfb.svg').default,
    description: (
      <>
        未成年人请勿打赏，是我最后的倔强。如果你觉得作者写的还可以,欢迎各位打赏。
        打赏的部分将用于域名购买，或者喝一杯java压压惊。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

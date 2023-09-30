import React from 'react';

import expertiseData from '../../db/expertiseSummary.json';

import '../../styles/pages/ExpertiseSummaryPage.scss';

const ExpertiseSummaryPage: React.FC = () => (
  <div className="expertise-summary-page-bg--container">
    <div className="blend-in-out">
      <main className="expertise container ">
        {Object.entries(expertiseData).map((expertiseSummary) => {
          const [expertiseCategory, expertiseItems] = expertiseSummary;
          return (
            <section key={expertiseCategory} className="expertise__card">
              <h2 className="text-hue-rotate">{expertiseCategory}</h2>
              <div className="expertise__items">
                {expertiseItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="squares--container">
                <div className="square-item" />
                <div className="square-item" />
                <div className="square-item" />
              </div>
            </section>
          );
        })}
      </main>
    </div>
  </div>
);

export default ExpertiseSummaryPage;

import React from 'react';
import { useState, useEffect } from 'react';

const CompanyInfo = ({ companyProfileData, companyInfo, ticker }) => {
  const [companyProfile, setCompanyProfile] = useState({});
  const [info, setInfo] = useState({});
  const [companyTicker, setCompanyTicker] = useState();

  useEffect(() => {
    setCompanyProfile(companyProfileData);
  }, [companyProfileData]);

  useEffect(() => {
    setInfo(companyInfo);
  }, [companyInfo]);

  useEffect(() => {
    setCompanyTicker(companyTicker);
  }, [ticker]);

  console.log(info);

  return (
    <>
      {!info ? (
        <div></div>
      ) : (
        <div className="company-profile">
          <h2 className="company-name">{info.shortName}</h2>
          <span className="company-info-summary">
            {companyProfile.longBusinessSummary}
          </span>
          <div className="inline-container">
            {/* <div className="company-info-container">
              <span className="company-info-title">CEO: </span>
              <span className="company-info">
                {companyProfile?.companyOfficers?.[0]?.name || 'N/A'}
              </span>
            </div>
            <div className="company-info-container">
              <span className="company-info-title">Sector: </span>
              <span className="company-info">{companyProfile.sector}</span>
            </div> */}
            {/* <div className="company-info-container">
              <span className="company-info-title">Employees: </span>
              <span className="company-info">
                {companyProfile.fullTimeEmployees}
              </span>
            </div> */}
            {/* <div className="company-info-container">
              <span className="company-info-title">Address: </span>
              <span className="company-info">
                {companyProfile.address1}, {companyProfile.city},
                {companyProfile.state}
              </span>
            </div>
            <div className="company-info-container">
              <span className="company-info-title">Website: </span>
              <span className="company-info">{companyProfile.website}</span>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyInfo;

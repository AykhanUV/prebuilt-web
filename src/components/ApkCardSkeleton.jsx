import React from 'react';

const ApkCardSkeleton = () => {
  return (
    <div className="apk-section apk-section-skeleton">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-version"></div>
      <div className="skeleton skeleton-logo"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text skeleton-text-short"></div>
      <div className="skeleton skeleton-button"></div>
      <div className="skeleton skeleton-meta"></div>
    </div>
  );
};

export default ApkCardSkeleton;

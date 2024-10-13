"use client"
import { DiscussionEmbed } from 'disqus-react'
import React from 'react';
const DisqusLoader = ({data}:any) => {
  const pageURL = typeof window !== 'undefined' ? window.location.href : ''
    return (
      <div className="mt-12">
        <DiscussionEmbed
          shortname="ece21"
          config={{
            url: pageURL,
            identifier: data?.slug,
            title: data?.title,
            language: 'en_US', //e.g. for Traditional Chinese (Taiwan)
          }}
        />
      </div>
    )
};

export default DisqusLoader;
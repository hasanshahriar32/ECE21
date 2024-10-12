"use client"
import { DiscussionEmbed } from 'disqus-react'
import React from 'react';
const DisqusLoader = ({data}:any) => {
    return (
      <div className='mt-12'>
        <DiscussionEmbed
          shortname="ece21"
          config={{
            url: data?.site,
            identifier: data?.slug,
            title: data?.title,
            language: 'en_US', //e.g. for Traditional Chinese (Taiwan)
          }}
        />
      </div>
    )
};

export default DisqusLoader;
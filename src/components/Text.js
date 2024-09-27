import React from 'react';
import PropTypes from 'prop-types';

const TextBlock = ({ paragraphs }) => {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        // TODO: Look at validating/sanitizing this input
        <p key={index} dangerouslySetInnerHTML={{ __html: paragraph.value }} />
      ))}
    </>
  );
};

TextBlock.propTypes = {
  paragraphs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TextBlock;

import React from 'react';
import { LinkToItem } from './';
import { translate } from '../helpers/translate';

const EditorList = (
  {
    _id,
    editors = [],
    language = '',
    pubtype = 'pubtype-1',
    intro = 'Series editor',
    introkey = 'series_editor',
    pluralize = true,
    and = 'and',
  },
  index
) => {
  const trans = translate(language);
  return (
    editors.length > 0 && (
      <span>
        {pubtype === 'pubtype-3'
          ? trans('reviewed_by')
          : editors.length > 1
          ? trans('series_editors')
          : trans('series_editor')}
        {': '}
        {editors
          .map(editor => (editor.target ? editor.target : editor))
          .map(({ _id = '', firstName = '', surname = '', slug = {} }, index) => (
            <span key={_id}>
              {_id ? (
                <LinkToItem type="person" slug={slug}>
                  <a>
                    {firstName} {surname}
                  </a>
                </LinkToItem>
              ) : (
                <span>
                  {firstName} {surname}
                </span>
              )}
              {editors.length > 1 && index + 2 < editors.length && <span>, </span>}
              {editors.length > 1 && index + 2 === editors.length && (
                <span> {`${trans('and')}`} </span>
              )}
            </span>
          ))}
      </span>
    )
  );
};

export default EditorList;

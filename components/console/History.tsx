import React from 'react';
import { History as HistoryInterface } from '../../interfaces/history';
import { Ps1 } from './';

interface Props {
  history: Array<HistoryInterface>;
}

const History: React.FC<Props> = ({ history }) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => (
        <div key={entry.command + index}>
          <div className="flex flex-row space-x-2">
            <div className="flex-shrink">
              <Ps1 />
            </div>

            <div className="flex-grow">{entry.command}</div>
          </div>

          <p
            className="whitespace-pre-wrap mb-2 mt-0"
            style={{ lineHeight: 'normal' }}
            dangerouslySetInnerHTML={{ __html: entry.output }}
          />
        </div>
      ))}
    </>
  );
};

export default History;

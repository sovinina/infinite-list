import { useEffect, useRef, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import repoStore from '../store';
import { Spin, List } from 'antd';
import ItemCard from './ItemCard';

const InfiniteScrollList: React.FC = observer(() => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (containerRef.current) {
          const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 200 && repoStore.hasMore) {
              repoStore.fetchMore();
          }
        }
    }, []);

  useEffect(() => {
      repoStore.fetchMore();
      const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
      <div ref={containerRef} style={{ height: '600px', overflowY: 'auto' }}>
        <List
          loading={repoStore.loading}
          dataSource={repoStore.repos}
          renderItem={item => (
            <List.Item key={item.id}>
              <ItemCard item={item} />
            </List.Item>
          )}
        />
        {repoStore.loading && (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <Spin />
          </div>
        )}
        {!repoStore.hasMore && <div style={{ textAlign: 'center', padding: '10px' }}>
            No more repos
        </div>}
      </div>
    );
});

export default InfiniteScrollList;

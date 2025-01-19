import { useState, useCallback, ChangeEvent } from 'react';
import { Card, Button, Input } from 'antd';
import { Repository } from '../types';
import { observer } from 'mobx-react-lite';
import repoStore from '../store';

interface ItemCardProps {
    item: Repository;
}

const ItemCard: React.FC<ItemCardProps> = observer(({ item }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editVals, setEditVals] = useState({ ...item });

    const handleEdit = useCallback(() => setIsEditing(true), []);

    const handleSave = useCallback(() => {
      repoStore.updateRepo(item.id, editVals);
      setIsEditing(false);
    }, [item.id, editVals]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> , field: string) => {
        setEditVals({ ...editVals, [field]: e.target.value});
    }, [editVals]);

    const handleDelete = useCallback(() => {
      repoStore.removeRepo(item.id);
    }, [item.id]);

    return (
        <Card
            title={
                isEditing ? (
                    <Input value={editVals.name} onChange={(e: ChangeEvent<HTMLInputElement>)=> handleChange(e, 'name')} />
                ) : (
                    item.name
                )
            }
            actions={[
                !isEditing && <Button key="edit" type="primary" onClick={handleEdit}>Edit</Button>,
                isEditing && <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
                <Button key="delete" type="danger" onClick={handleDelete}>Delete</Button>,
            ]}
        >
            {isEditing ? (
                <>
                    <p>
                        Description:
                        <Input value={editVals.description || ''} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'description') } />
                    </p>
                </>

            ) : (
                <>
                    <p>
                        <strong>Description:</strong> {item.description || 'No description'}
                    </p>
                    <p>
                        <strong>Stars:</strong> {item.stargazers_count}
                    </p>
                    <p>
                        <strong>Owner:</strong> {item.owner.login}
                    </p>
                    <img src={item.owner.avatar_url} alt={`${item.owner.login}'s avatar`} style={{ width: '50px' }} />
                </>
            )}
        </Card>
    );
});

export default ItemCard;

import { Add, Cancel } from '@mui/icons-material';
import { Button, Chip, Dialog, Card, CardActions } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import './AddCategory.scss';

interface AddCategoryProps {

}

interface AddCategoryState {
    categories: Category[];
    showDialog: boolean;
}
interface Category {
    id: string;
    name: string;
}

class AddCategory extends React.Component<AddCategoryProps, AddCategoryState> {
    state = {
        categories: [],
        showDialog: false,
    } as AddCategoryState
    componentDidMount() {
        const categories = useAppSelector(state => state.store.category.categories.map(item => {
            const category: Category = {
                id: item.id,
                name: item.name,
            }
            return category;
        }));
        this.setState({ categories })
    }
    render() {
        return (<div className="add-category-picker-container">
            <Button onClick={() => this.setState({ showDialog: true })
            }>
                <Add />
          Add Category
        </Button>
            <div className="add-category-ids">
                {this.state.categories.map((category) => (
                    <Chip label={category.name} />
                ))}
            </div>
            <Dialog open={this.state.showDialog} onClose={
                () => this.setState({ showDialog: false })
            }>
                <Card>select category
                    <CardActions>
                        <Button color='error'>
                            <Cancel />
                            Close
                        </Button>
                    </CardActions>
                </Card>
            </Dialog>
        </div>);
    }
}

export default AddCategory;
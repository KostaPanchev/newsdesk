import React from 'react';
import PropTypes from 'prop-types';
import styles from './category.module.scss';

const Category = ({category, onChangeCustomFilter}) => {
    let wrapperClass = styles.categoryWrapper;
    let categoryClass = styles.categoryItem;

    if(category.selected){
        wrapperClass = styles.categoryWrapperActive;
        categoryClass = styles.categoryItemActive;
    }

    return (
        <li key={category.id} className={wrapperClass}>
            <div className={categoryClass} onClick={onChangeCustomFilter}
                data-categoryid={category.id}
                data-categorytitle={category.title}>

                <span className={styles.title}>
                    {category.title}
                </span>
                {category.note && 
                        <span className={styles.subTitle}>
                            {category.note}
                        </span>
                }
            </div>
            
        </li>
    );
};

Category.propTypes = {
    category: PropTypes.object.isRequired,
    onChangeCustomFilter: PropTypes.func.isRequired
};

export default Category;
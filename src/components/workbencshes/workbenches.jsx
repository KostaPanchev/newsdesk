import React /*, { Fragment} */ from 'react';
import PropTypes from 'prop-types';
import styles from './workbenches.module.scss';
// import Category from './category';
// import { ArrowDownIcon } from '../../icons/icons';

const Workbenches = (props) => {
    let { workbench: activeWorkbench } = props.userSettings;


    let workbenchItems = props.workbenches.map(workbench => {
        return (
            <li key={workbench.id}
                className={workbench.id === activeWorkbench.id ? styles.workbenchItemSelected : styles.workbenchItem} >
                <span  data-workbenchid={workbench.id}
                    data-workbenchtitle={workbench.title}
                    onClick={props.onWorkbenchChange} 
                    className={styles.workbenchItemInner}>
                    {workbench.title}
                </span>
            </li>
        );
    });
        
    let WorkbenchesList = () => (
        <ul className={activeWorkbench.id === -1 ?  styles.workbencesList : styles.workbencesListActive }>
            <li className={!activeWorkbench.id ? styles.workbenchItemSelected : styles.workbenchItem}>
                <span data-workbenchid={0}
                    data-workbenchtitle='Alle kategorier'
                    onClick={props.onWorkbenchChange}
                    className={styles.workbenchItemInner}>
                        Vis alle kategorier
                </span>
            </li>
            {workbenchItems}
        </ul>
    );

    // let categories = props.userSettings.customFilter.sort((a, b) => {
    //     var nameA = a.title.toUpperCase(); // ignore upper and lowercase
    //     var nameB = b.title.toUpperCase(); // ignore upper and lowercase
    //     if (nameA < nameB) {
    //         return -1;
    //     }
    //     if (nameA > nameB) {
    //         return 1;
    //     }
    //     // names must be equal
    //     return 0;
    // }).map(category =>  (
    //     <Category key={category.id}
    //         category={category}
    //         // customFilter={props.userSettings.customFilter}
    //         onChangeCustomFilter={props.onChangeCustomFilter}
    //         onChangePriority={props.onChangePriority}/>
    // ));

    // let CategoriesList = () => (
    //     <Fragment>
    //         {activeWorkbench.id !== -1 ? 
    //             <div className={styles.customFilterHeader}
    //                 data-workbenchid={-1}
    //                 data-workbenchtitle='Custom filter'
    //                 onClick={props.onWorkbenchChange}>
    //                 <span>
    //                     Brug et custom filter
    //                 </span>
    //                 <ArrowDownIcon />

    //             </div> :
    //             <div className={styles.customFilterBody}>
    //                 <div className={styles.categoriesButtons}>
    //                     <span className={styles.categoriesBtn} data-categoryid={-1}
    //                         onClick={props.onChangeCustomFilter}>
    //                         Vælg Alle
    //                     </span>
    //                     <span className={styles.categoriesBtn} data-categoryid={0}
    //                         onClick={props.onChangeCustomFilter}>
    //                         Fravælg alle
    //                     </span>
    //                 </div>
    //                 <ul className={styles.categoriesList}>
    //                     {categories}
    //                 </ul>
    //             </div>
    //         }
            
    //     </Fragment>
    // );

    return (
        <div className={styles.workbenches}>
            <WorkbenchesList />
            {/* <div className={activeWorkbench.id === -1 ? styles.customFilterSelected :  styles.customFilter}>
                <CategoriesList />
            </div> */}
        </div>
    );
};

Workbenches.propTypes = {
    workbenches: PropTypes.array.isRequired,
    userSettings: PropTypes.object.isRequired,
    onWorkbenchChange: PropTypes.func.isRequired,
    onChangeCustomFilter: PropTypes.func.isRequired
};

export default Workbenches;
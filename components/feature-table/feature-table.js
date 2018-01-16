import './feature-table.less';
import ListTable from 'spectre-canjs/sp-list-table/sp-list-table';
import ViewModel from './ViewModel';
export default ListTable.extend({
    tag: 'feature-table',
    ViewModel: ViewModel
});
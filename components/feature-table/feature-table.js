import './feature-table.less';
import ListTable from 'can-admin/components/list-table/list-table';
import ViewModel from './ViewModel';
export default ListTable.extend({
    tag: 'feature-table',
    ViewModel: ViewModel
});
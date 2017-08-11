import renderer from './defaultContent.stache';
import getFragNode from '~/util/dom/getFragNode';
import 'can-admin/components/property-table/property-table';

export default function (data) {
    return getFragNode(renderer(data));
}
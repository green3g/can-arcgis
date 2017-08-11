export default function getFragNode (frag) {
    const node = document.createElement('div');
    node.appendChild(frag);
    return node;
}

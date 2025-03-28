import instance from "../config";

export default function collectDoc(docId: string) {
  return instance.put(`/api/doc/collect/${docId}`);
}

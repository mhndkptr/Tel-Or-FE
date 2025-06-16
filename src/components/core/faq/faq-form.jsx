import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

export default function FaqForm({ formData, setFormData, categoriesObj, onSubmit, onCancel, isPending, editingFaq }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pertanyaan">Pertanyaan</Label>
        <Input
          id="pertanyaan"
          value={formData.question}
          onChange={(e) => setFormData({ ...formData, question: e.target.value })}
          placeholder="Masukkan pertanyaan..."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="jawaban">Jawaban</Label>
        <Textarea
          id="jawaban"
          value={formData.answer}
          onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
          placeholder="Masukkan jawaban..."
          rows={4}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih kategori">
              {formData.category ? categoriesObj[formData.category] : ""}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categoriesObj).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button type="submit" disabled={isPending}>
          {editingFaq ? "Update" : "Simpan"}
        </Button>
      </DialogFooter>
    </form>
  );
}
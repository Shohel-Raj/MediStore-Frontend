import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CreateProductFormClient from "./CreateProductFormClient";

export default function CreateProductFormServer() {
  return (
    <Card className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-muted/50 bg-background shadow-sm">
      <CardHeader className="space-y-1 border-b border-muted/40 bg-muted/10 px-5 py-2 md:px-6">
        <CardTitle className="text-lg md:text-xl font-semibold tracking-tight">
          Add New Product
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Saved as <span className="font-semibold text-foreground"><i>Status :</i> Active</span>{" "}
          by default.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 py-2 md:px-6">
        <CreateProductFormClient>
          {/* BASIC INFO */}
          <section className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm md:text-base font-semibold">
                Basic Information
              </h3>
              <span className="text-[11px] text-muted-foreground">
                * required
              </span>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Product Name *</FieldLabel>
                <Input id="name" name="name" placeholder="Napa Extra" required />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Write product details..."
                  className="min-h-27"
                />
              </Field>
            </FieldGroup>
          </section>

          {/* MEDICINE DETAILS */}
          <section className="space-y-3">
            <h3 className="text-sm md:text-base font-semibold">
              Medicine Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="manufacturer">Manufacturer</FieldLabel>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  placeholder="Square / Beximco"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="dosageForm">Dosage Form</FieldLabel>
                <Input
                  id="dosageForm"
                  name="dosageForm"
                  placeholder="Tablet / Syrup / Capsule"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="strength">Strength</FieldLabel>
                <Input id="strength" name="strength" placeholder="500mg" />
              </Field>

              <Field>
                <FieldLabel htmlFor="packSize">Pack Size</FieldLabel>
                <Input
                  id="packSize"
                  name="packSize"
                  placeholder="10 tablets / 100ml bottle"
                />
              </Field>
            </div>
          </section>

          {/* PRICING & STOCK */}
          <section className="space-y-3">
            <h3 className="text-sm md:text-base font-semibold">
              Pricing & Stock
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="price">Price *</FieldLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="120"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="discountPrice">Discount Price</FieldLabel>
                <Input
                  id="discountPrice"
                  name="discountPrice"
                  type="number"
                  step="0.01"
                  placeholder="100"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="stock">Stock *</FieldLabel>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  placeholder="50"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="lowStockThreshold">
                  Low Stock Threshold
                </FieldLabel>
                <Input
                  id="lowStockThreshold"
                  name="lowStockThreshold"
                  type="number"
                  placeholder="10"
                  defaultValue={10}
                />
              </Field>
            </div>
          </section>

          {/* IMAGES */}
          <section className="space-y-2">
            <h3 className="text-sm md:text-base font-semibold">Images</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="image">Main Image URL</FieldLabel>
                <Input id="image" name="image" placeholder="https://..." />
              </Field>

              <Field>
                <FieldLabel htmlFor="images">Gallery Images</FieldLabel>
                <Input
                  id="images"
                  name="images"
                  placeholder="comma separated URLs"
                />
              </Field>
            </div>
          </section>

          {/* SUBMIT */}
          <CardFooter className="px-0 pt-2">
            <Button type="submit" className="w-full cursor-pointer h-10 rounded-xl font-semibold">
              Publish Product
            </Button>
          </CardFooter>
        </CreateProductFormClient>
      </CardContent>
    </Card>
  );
}

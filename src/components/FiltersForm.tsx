import { FormEvent, useState } from "react";
import { SetURLSearchParams } from "react-router-dom";
import FitlersSelectInput from "./FitlersSelectInput";

type QueryOptionsType = {
  order: string | null;
  sortBy: string | null;
  petType: string | null;
};

type FilterFormProps = {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export default function FiltersForm({
  searchParams,
  setSearchParams,
}: FilterFormProps) {
  const [queryOptions, setQueryOptions] = useState<QueryOptionsType>({
    order: searchParams.get("order") || null,
    sortBy: searchParams.get("sortBy") || null,
    petType: searchParams.get("petType") || null,
  });

  function handleInputChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    console.log("value", e.target.value);
    setQueryOptions({
      ...queryOptions,
      [e.target.name]: e.target.value,
    });

    return;
  }

  function handleFiltersSubmit(e: FormEvent) {
    e.preventDefault();
    const params: Record<string, string> = {};
    let param: keyof QueryOptionsType;
    for (param in queryOptions) {
      console.log(param, queryOptions[param]);
      const assign = queryOptions[param];
      if (
        assign != undefined &&
        typeof assign == "string" &&
        !["-1", "all", "date"].includes(assign)
      ) {
        params[param] = assign;
      }
    }

    setSearchParams(params);
  }
  return (
    <form
      className="bg-card-gray mt-4 flex items-center justify-between gap-4 p-3 font-semibold text-neutral-950 md:justify-start"
      onSubmit={handleFiltersSubmit}
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="flex gap-2">
          Sort By:
          <FitlersSelectInput
            handleInputChange={handleInputChange}
            name="sortBy"
            optionsList={["date", "likes"]}
            searchParams={searchParams}
            stateValue={queryOptions.sortBy}
          />
        </label>
        <label className="flex gap-2">
          Pet Type:
          <FitlersSelectInput
            name="petType"
            handleInputChange={handleInputChange}
            stateValue={queryOptions.petType}
            searchParams={searchParams}
            optionsList={[
              "all",
              "dog",
              "cat",
              "rabbit",
              "hamster",
              "lizard",
              "other",
            ]}
          />
        </label>
        <label className="flex gap-2">
          Order:
          <FitlersSelectInput
            name="order"
            handleInputChange={handleInputChange}
            stateValue={queryOptions.order}
            searchParams={searchParams}
          >
            <option value={-1}>descending</option>
            <option value={1}>ascending</option>
          </FitlersSelectInput>
        </label>
      </div>
      <button
        type="submit"
        className="rounded-[11px] bg-neutral-950 p-[2px] px-2 text-stone-50"
      >
        Apply
      </button>
    </form>
  );
}

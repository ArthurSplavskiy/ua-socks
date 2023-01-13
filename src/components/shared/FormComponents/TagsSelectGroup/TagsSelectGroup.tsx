import React, { FC, useMemo } from "react";
import {TagsGroup} from "components/shared/TagsGroup/TagsGroup";
import {SearchButtonField} from "../SearchButtonField/SearchButtonField";
import {ConfirmWindow} from "components/shared/ConfirmWindow/ConfirmWindow";
import {useTagsSelectGroup} from "hooks/useTagsSelectGroup";
import "./TagsSelectGroup.scss";

interface iTagsSelectGroup extends Partial<ReturnType<typeof useTagsSelectGroup>> {
  removeTag: (id: string) => void;
  isShowRemoveWindow: boolean;
  hideRemoveWindow: () => void;
  nameFromRemove?: string;
  confirmRemove: () => void;
  tagForRemove?: string;
  label?: string;
  onInputChange: (inputValue: string) => void;
  options: any[];
  onChange: (data: any) => void;
  value: any[];
  buttonTitle: string;
  isLoading: boolean;
  personFirstName?: string;
}

export const TagsSelectGroup: FC<iTagsSelectGroup> = ({
  buttonTitle,
  confirmRemove,
  hideRemoveWindow,
  isLoading,
  isShowRemoveWindow,
  onChange,
  onInputChange,
  options,
  removeTag,
  value,
  deletingValue,
  label,
  personFirstName,
}) => {
  const valueTags = useMemo(() => {
    return value.map((item: any) => ({value: item.id, label: item.name}));
  }, [value]);

  const personName = personFirstName ? `${personFirstName}'s` : "";

  return (
    <>
      <div className="TagsSelectGroup">
      {label && <h5 className="TagsSelectGroup-title">{label}</h5>}

      <div className="TagsSelectGroup-tags-wrapper">
          <TagsGroup
            tags={valueTags}
            elementClass="tag-link tag-link__company"
            removeItem={removeTag}
            wrapperClass="tags-group"
          />

          <SearchButtonField
            title={buttonTitle}
            value={value}
            onChange={onChange}
            options={options}
            onInputChange={onInputChange}
            isLoading={isLoading}
          />
        </div>

        <ConfirmWindow
          show={isShowRemoveWindow}
          onClose={hideRemoveWindow}
          onConfirm={confirmRemove}
          confirmBtn={{
            color: "red",
            text: "Delete"
          }}
          cancelBtn={{
            text: "cancel"
          }}
          title="Unlink Company"
        >
          <div className="PeopleForm-confirmWindow-body">
            <p>
              Are you sure you want to unlink {deletingValue?.name} from {personName} record?
            </p>
            <p className="PeopleForm-confirmWindow-warning">This can’t be undone.</p>
          </div>
        </ConfirmWindow>
      </div>
    </>
  );
};

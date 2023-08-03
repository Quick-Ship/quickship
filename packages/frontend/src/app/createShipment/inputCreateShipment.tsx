import { GeneralForm } from "@/components";
import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPanel,
} from "@elastic/eui";

interface InputCreateShipmentProps {
  register: any;
  setValue: (name: string, value: string) => void;
  errors: any;
}
export const InputCreateShipment: React.FC<InputCreateShipmentProps> = ({
  errors,
  register,
  setValue,
}) => {
  const onChange = (e: any) => {
    const { name, value } = e.target;

    setValue(name, value);
  };
  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiPanel>
          <strong>Datos Generales</strong>
          <EuiHorizontalRule />
          <EuiFormRow>
            <EuiFieldText
              name="instructions"
              onChange={onChange}
              inputRef={register("street")}
              placeholder="Calle"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="packages type"
              onChange={onChange}
              inputRef={register("street")}
              placeholder="Calle"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="idClient"
              onChange={onChange}
              inputRef={register("street")}
              placeholder="Calle"
            />
          </EuiFormRow>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <strong>Direccion</strong>
          <EuiHorizontalRule />
          <EuiFormRow>
            <EuiFieldText
              name="street"
              onChange={onChange}
              inputRef={register("street")}
              placeholder="Calle"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="neigthboorhood"
              onChange={onChange}
              inputRef={register("neigthboorhood")}
              placeholder="Colonia"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="municipality"
              onChange={onChange}
              inputRef={register("municipality")}
              placeholder="Delegación o municipio"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="state"
              onChange={onChange}
              inputRef={register("state")}
              placeholder="Ciudad"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="zipCode"
              onChange={onChange}
              inputRef={register("zipCode")}
              placeholder="Codigo postal"
            />
          </EuiFormRow>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <strong>Contacto</strong>
          <EuiHorizontalRule />
          <GeneralForm
            register={register}
            setValue={setValue}
            errors={errors}
          />
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

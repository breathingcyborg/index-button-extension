import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import { useKeys } from "./keys-context";

export function AddKey({ onSuccess }: { onSuccess: () => void }) {
    const [processing, setProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { add } = useKeys();
  
    const handleInputChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      setErrorMessage(null);

      const file = event.target.files?.[0];
      if (!file) return
      
      setProcessing(true);
  
      // check json
      if (file.type !== "application/json") {
        setErrorMessage("Not a valid json file");
        setProcessing(false);
        return;
      }
  
      const reader = new FileReader();
      reader.onload = async () => {
        const fileContent = reader.result as string;
        let json: any = null;
  
        // Parse JSON
        try {
  
          json = JSON.parse(fileContent)
  
        } catch (e) {
  
          setErrorMessage('not a valid json file');
          setProcessing(false);
        }
  
        
        const result = await add(json)
        if (!result.success) {
          setProcessing(false);
          setErrorMessage(result.message);
          return
        }

        setProcessing(false);
        onSuccess();
      }
  
      reader.onerror = () => {
        const error = reader.error;
        const message = error === null
          ? 'Could not read file'
          : `Could not read file: ${error.message}`;
        setErrorMessage(message);
        setProcessing(false);
      }
      
      reader.readAsText(file)
    }
  
    return <div>
      <div className="mt-8">
        <div className="grid w-full gap-2">
          <Label htmlFor="key">Google service account key</Label>
          <Input
            onChange={handleInputChange}
            id="key"
            type="file"
          />
        </div>
      </div>
      {
        processing && (
          <div className="mt-8 flex justify-center">
            <Loader2Icon className='animate-spin' />
          </div>
        )
      }
      {
        errorMessage && (
          <div className="bg-destructive p-1 mt-8">
            {errorMessage}
          </div>
        )
      }
    </div>
  
  }
  
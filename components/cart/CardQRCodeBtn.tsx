

import { Cart } from "@prisma/client"
import { ClipboardCopy, Copy, ExternalLink, Link2, QrCode } from "lucide-react"
import Link from "next/link"


export default function CardQRCodeBtn({ cart }: { cart: Cart }) {

    const handleGenerateQRCode = () => {

    }

    return (
        <>
            <button className="btn btn-sm btn-ghost tooltip  text-base-content/70 " data-tip="QRCode" onClick={() => (document.getElementById('my_modal_2') as HTMLDialogElement)?.showModal()} >
                <QrCode size={16} />
            </button>

            <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-xl">{cart.name} - {cart.room}</h3>
                    <p className="text-base-content/70 text-sm">Acesso via QRCode</p>

                    <div className="divider mx-0"></div>

                    <div className="w-full flex flex-col items-center justify-center gap-4">
                        <div className="w-56 rounded  p-4 border border-base-content/10">
                            <img src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"  />
                        </div>

                        <p className="text-base-content/70 text-sm text-center">Imprima este código e fixe no carrinho. A leitura levará direto para a página de formulário.</p>
                    </div>

                    <div className="join mt-5 flex items-center justify-center">
                        <label htmlFor="" className="input join-item disabled ">
                            <Link2 size={16} />
                            <input type="url" disabled value={`/carrinhos/${cart.id}`} />

                        </label>

                        <Link href={`/carrinhos/${cart.id}`} className="btn btn-primary join-item tooltip tooltip-primary" data-tip='Abrir formulário'>
                            <ExternalLink size={16} />
                        </Link>
                    </div>

                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}